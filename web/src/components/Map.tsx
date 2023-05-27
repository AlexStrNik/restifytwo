import { Box, Card, Paper } from "@mantine/core";
import "react";

interface MapProps {
  address: string;
}

const Map: React.FC<MapProps> = ({ address }) => {
  return (
    <Paper
      shadow="sm"
      radius="md"
      withBorder
      style={{ overflow: "hidden", height: "400px" }}
    >
      <iframe
        src={`https://yandex.com/map-widget/v1/?indoorLevel=1&ll=37.580391%2C55.746274&mode=search&oid=${address}&ol=biz&z=16.94`}
        width="100%"
        height="100%"
        allowFullScreen
        style={{ position: "relative", border: 0 }}
      ></iframe>
    </Paper>
  );
};

export default Map;
