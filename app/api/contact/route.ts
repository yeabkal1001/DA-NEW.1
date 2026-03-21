import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Simulate network latency and processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, you would send an email (e.g., using Resend or SendGrid)
    // or store it in a database here.
    console.log("Received contact form submission:", data);

    return NextResponse.json({ success: true, message: "OK" }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
