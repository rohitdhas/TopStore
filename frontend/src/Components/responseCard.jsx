import { Box, Card } from "../Styles/responseCardStyles";
import { useEffect } from "react";

export default function ResCard({ message, setMessage }) {
  let notificationTimeout;

  useEffect(() => {
    clearTimeout(notificationTimeout);
    if (message === "") return;

    let card = document.getElementById("card");
    card.classList.add("active");

    notificationTimeout = setTimeout(() => {
      card.classList.remove("active");
      setMessage("");
    }, 2500);
  }, [message]);

  return (
    <Box>
      <Card id="card">
        <p>{message}</p>
      </Card>
    </Box>
  );
}
