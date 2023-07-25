import gql from 'graphql-tag'
export const ROUTE = gql`
query route{
        bikeRentalStations{
          name
          stationId
        }
      }
    `;
 