import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const response = await fetch(`${API_BASE_URL}/character?page=${page}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "API request failed" },
        { status: response.status }
      );
    }

    const results = await response.json();
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occured while fetching data" },
      { status: 500 }
    );
  }
}
