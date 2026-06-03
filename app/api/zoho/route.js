import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, phone, company, preferredSolutions, selectedSlot, leadDetails, title } = body;

        // Step 1: Secure OAuth Token Exchange utilizing process boundaries
        const tokenUrl = "https://accounts.zoho.com/oauth/v2/token";
        const tokenParams = new URLSearchParams();
        tokenParams.append("refresh_token", process.env.ZOHO_REFRESH_TOKEN);
        tokenParams.append("client_id", process.env.ZOHO_CLIENT_ID);
        tokenParams.append("client_secret", process.env.ZOHO_CLIENT_SECRET);
        tokenParams.append("grant_type", "refresh_token");

        const tokenResponse = await axios.post(tokenUrl, tokenParams);
        const accessToken = tokenResponse.data.access_token;

        // Step 2: Formulating clean targeted specific fields markup descriptions strings
        const customizedSummaryDescription = `
Prefered Soltions : ${preferredSolutions || "Not Selected"}
Selected time : ${selectedSlot || "Not Selected"}
        `.trim();

        // Step 3: Pushing final synchronized record variables directly into Zoho Modules
        const crmUrl = "https://www.zohoapis.com/crm/v2/Leads";
        const crmData = {
            data: [
                {
                    Last_Name: name || "Chatbot Lead",
                    Email: email || "no-email@provided.com",
                    Phone: phone || "Not Provided",
                    Company: company || "Individual Consultation",
                    Description: customizedSummaryDescription,
                    Lead_Source: "Interactive Chatbot Terminal v2",
                    Title: title || "Data coming from web",
                    Lead_Details: leadDetails || "Data coming from web"
                },
            ],
        };

        const crmResponse = await axios.post(crmUrl, crmData, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(
            { success: true, message: "Lead synchronised successfully with grid columns", data: crmResponse.data },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error creating record mapping details:", error.response ? error.response.data : error.message);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to map entries to dashboards modules",
                error: error.response ? error.response.data : error.message,
            },
            { status: 500 }
        );
    }
}