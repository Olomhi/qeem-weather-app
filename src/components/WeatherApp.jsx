import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const BaseUrl = import.meta.env.VITE_BaseUrl;

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${BaseUrl}/weather?city=${city}`);
      setWeather(res.data);
    } catch (err) {
      setError("Unable to fetch weather. Try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>🌦 Weather App</Title>

        <InputGroup>
          <Input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
          />
          <Button onClick={getWeather}>
            {loading ? "Loading..." : "Search"}
          </Button>
        </InputGroup>

        {error && <Error>{error}</Error>}

        {weather && (
          <Result>
            <City>📍 {weather?.data?.city}</City>

            <InfoGrid>
              <InfoBox>
                <span>🌡</span>
                <p>{weather?.data?.temperature}°C</p>
              </InfoBox>

              <InfoBox>
                <span>☁</span>
                <p>{weather?.data?.condition}</p>
              </InfoBox>

              <InfoBox>
                <span>💨</span>
                <p>{weather?.data?.windSpeed} m/s</p>
              </InfoBox>
            </InfoGrid>
          </Result>
        )}
      </Card>
    </Wrapper>
  );
};

export default WeatherApp;

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 380px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);

  padding: 30px;
  border-radius: 20px;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

  text-align: center;
  color: white;

  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 16px;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.8rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;

  border: none;
  border-radius: 8px;
  outline: none;

  font-size: 1rem;

  background: rgba(255, 255, 255, 0.2);
  color: white;

  &::placeholder {
    color: #ddd;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 12px 18px;
  border: none;
  border-radius: 8px;

  background: linear-gradient(135deg, #00ff88, #00c9ff);
  color: black;

  font-weight: bold;
  cursor: pointer;

  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Error = styled.p`
  color: #ff6b6b;
  margin-top: 10px;
  font-size: 0.9rem;
`;

const Result = styled.div`
  margin-top: 20px;
`;

const City = styled.h3`
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const InfoGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const InfoBox = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);

  padding: 12px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 1.5rem;
  }

  p {
    margin-top: 5px;
    font-size: 0.9rem;
  }
`;
