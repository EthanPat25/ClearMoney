import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fund = searchParams.get("fund");
  const option = searchParams.get("option");

  if (!fund || !option) {
    return NextResponse.json(
      { error: "Fund and option parameters are required" },
      { status: 400 }
    );
  }

  // Fetch only the percentage column for the specified fund and option
  const { data, error } = await supabase
    .from("Holdings")
    .select("Weighting_Percentage_Clean")
    .eq("Super_Fund", fund)
    .eq("Option_Name", option);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }

  // Sum all the percentages from the returned rows
  const totalPercentage = data.reduce(
    (sum, row) => sum + (row.Weighting_Percentage_Clean || 0),
    0
  );

  return NextResponse.json({
    fund,
    option,
    numberOfRowsChecked: data.length,
    totalPercentage: totalPercentage,
  });
}
