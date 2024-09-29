import {
  Container,
  Heading,
  Section,
  CountryInfo,
  Loader,
  GoBackBtn,
} from 'components';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

export const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const goBackLink = useRef(location.state || '/');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCountry(countryId);

        setCountry(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [countryId]);
  return (
    <Section>
      <Container>
        <GoBackBtn path={goBackLink.current} />
        {country && <CountryInfo {...country} />}
        {loading && <Loader />}
        {errorMessage && <Heading title="Something is wrong..." bottom />}
      </Container>
    </Section>
  );
};
