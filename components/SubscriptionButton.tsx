"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";


export const SubscriptionButton = ({
  isPro = false
}: {
  isPro: boolean;
}) => {

  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button size="sm" variant={isPro ? "default" : "premium"} disabled={loading} onClick={onClick} >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
};