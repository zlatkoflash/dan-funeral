"use client";

import { getApiData } from "@/utils/api";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Admin() {
  const [startingLength, setStartingLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const ___AddDemoData = async () => {
    // 1. Turn on loading immediately when the button is clicked
    setIsLoading(true);

    // 2. Define the recursive worker loop
    const runBatch = async (currentOffset: number) => {
      try {
        const results = await getApiData<{
          ok: boolean;
          count_rows: number;
        }>(
          "/data-manipulation/AddDemoDataToTheListings",
          "POST",
          {
            starting: currentOffset, // Uses the fresh numeric argument
          },
          "not-authorize",
          "application/json",
        );

        console.log("results:", results);

        // 3. THE EXIT DOOR: If no rows came back, or API failed, stop here!
        if (!results || !results.ok || Number(results.count_rows) === 0) {
          return;
        }

        // 4. Calculate the true next offset instantly
        const nextOffset = currentOffset + Number(results.count_rows);

        // Update the UI state so the user can track progress visually
        setStartingLength(nextOffset);

        // 5. Explicitly await the next batch loop with the updated number
        await runBatch(nextOffset);
      } catch (error) {
        console.error("Batch migration failed:", error);
        // Exit the loop on network failure
      }
    };

    // Kick off the loop using the initial state value
    await runBatch(startingLength);

    // 6. This line WILL wait until the entire recursion is completely finished
    setIsLoading(false);
  };

  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          ___AddDemoData();
        }}
        disabled={isLoading}
      >
        Start Adding Demo Data Updated Rows: {startingLength}
        {isLoading && " (Loading...)"}
      </Button>
    </div>
  );
}
