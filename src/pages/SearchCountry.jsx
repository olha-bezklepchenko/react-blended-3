import {
  Container,
  Heading,
  Section,
  SearchForm,
  CountryList,
  Loader,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';

export const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const region = searchParams.get('region');
    if (!region) {
      return;
    }
    const featchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    featchData();
  }, [searchParams]);
  const onSubmit = region => {
    setSearchParams({ region });
  };
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onSubmit} />
        {isError && <Heading title="Something is wrong..." bottom />}
        {isLoading && <Loader />}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
