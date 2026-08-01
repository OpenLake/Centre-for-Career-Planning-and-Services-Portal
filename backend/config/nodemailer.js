import dotenv from 'dotenv';
dotenv.config();

const sendBrevoEmail = async ({ to, subject, htmlContent }) => {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            sender: { email: "kansal.akshat757@gmail.com", name: "CCPS Portal" },
            to: [{ email: to }],
            subject,
            htmlContent,
        }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));
    return data;
};

export default sendBrevoEmail;
