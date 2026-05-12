export async function onRequestPost({ request }) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["name", "email", "service", "message"];
  const missing = required.filter((field) => !String(body[field] || "").trim());

  if (missing.length > 0) {
    return Response.json({ ok: false, error: "Missing required fields", missing }, { status: 400 });
  }

  const inquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    company: String(body.company || "").trim(),
    service: String(body.service).trim(),
    budget: String(body.budget || "").trim(),
    date: String(body.date || "").trim(),
    message: String(body.message).trim(),
    source: "g7creative.com/contact",
    status: "new",
  };

  console.log("New inquiry", JSON.stringify(inquiry));

  return Response.json({
    ok: true,
    inquiryId: inquiry.id,
    next: "Connect D1 for storage and Resend or another email provider for notifications.",
  });
}

export async function onRequestGet() {
  return Response.json({ ok: true, endpoint: "G7 Creative inquiry intake" });
}
