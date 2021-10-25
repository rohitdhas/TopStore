import { Box, Card } from "../Styles/responseCardStyles";
import { useSelector, useDispatch } from "react-redux";
import { resetNotification } from "../Redux/notification";
import { useEffect } from "react";

export default function ResCard() {
  let notificationTimeout;
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.notification);

  useEffect(() => {
    clearTimeout(notificationTimeout);
    if (notification === "") return;

    let card = document.getElementById("card");
    card.classList.add("active");

    notificationTimeout = setTimeout(() => {
      card.classList.remove("active");
      dispatch(resetNotification());
    }, 2500);
  }, [notification]);

  return (
    <Box>
      <Card id="card">
        <p>{notification}</p>
      </Card>
    </Box>
  );
}
