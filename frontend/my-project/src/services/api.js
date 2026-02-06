// Base URL is read from environment variables
// Local:  http://127.0.0.1:8000
// Prod:   https://your-backend-name.onrender.com

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export async function predictChurn(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Prediction failed: ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
}