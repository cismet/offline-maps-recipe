import { Card, Row, Col } from "antd";

const { Meta } = Card;
export default function Landing() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Demo Offline Map Recipe</h2>
        <a href={process.env.PUBLIC_URL + "/#/slides"}>
          <Card
            hoverable
            style={{ width: 240, margin: 20 }}
            cover={
              <img alt="slides" src={process.env.PUBLIC_URL + "/logo512.png"} />
            }
          >
            <Meta title="Slides" description="Full presentation" />
          </Card>
        </a>
        <a href={process.env.PUBLIC_URL + "/#/step0"}>
          <Card
            hoverable
            style={{ width: 240, margin: 20 }}
            cover={
              <img alt="step0" src={process.env.PUBLIC_URL + "/logo512.png"} />
            }
          >
            <Meta
              title="Step 0"
              description="Simple Map with a Vector Tile Layer"
            />
          </Card>
        </a>
        <a href={process.env.PUBLIC_URL + "/#/step1"}>
          <Card
            hoverable
            style={{ width: 240, margin: 20 }}
            cover={
              <img alt="step1" src={process.env.PUBLIC_URL + "/logo512.png"} />
            }
          >
            <Meta
              title="Step 1"
              description="Simple Map with a Offline Vector Tile Layer"
            />
          </Card>
        </a>
        <a href={process.env.PUBLIC_URL + "/#/step2"}>
          <Card
            hoverable
            style={{ width: 240, margin: 20 }}
            cover={
              <img alt="step2" src={process.env.PUBLIC_URL + "/logo512.png"} />
            }
          >
            <Meta
              title="Step 2"
              description="Simple Map with a Offline Vector Tile Layer with Online Fallback"
            />
          </Card>
        </a>
      </div>
    </div>
  );
}
