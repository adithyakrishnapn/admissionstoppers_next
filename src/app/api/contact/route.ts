import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic Validation
    if (!data.name || (!data.email && !data.phone)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save Lead to Firebase Firestore (Optional Fallback / Lead CRM)
    if (db && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      try {
        await addDoc(collection(db, "leads"), {
          ...data,
          createdAt: new Date().toISOString(),
          source: data.source || "Website Contact Form",
        });
      } catch (dbError) {
        console.warn("Failed to save to Firestore:", dbError);
      }
    }

    // 2. Send Email using Nodemailer (Replacing PHP Mailer)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `Admissions Topper Form <${process.env.SMTP_USER}>`,
        to: "admissionstopper.edu@gmail.com", // Admin receives this
        subject: data.subject || `New Lead: ${data.name}`,
        html: `
          <h2>New Website Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email || "N/A"}</p>
          <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
          ${data.course ? `<p><strong>Course:</strong> ${data.course}</p>` : ""}
          ${data.location ? `<p><strong>Location:</strong> ${data.location}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${data.message || data.comments || "N/A"}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.log("No SMTP credentials. Dev Mode - Data payload:", data);
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
