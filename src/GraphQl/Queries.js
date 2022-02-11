import { gql } from 'apollo-boost';


export const getCategories = gql`
{
  categories{
    name
    products{
      id
      name      
      gallery
      prices{
        currency{
          label
          symbol
        }
        amount
      }
    }
  }    
}
`


export const currencyProduct = gql`
{
  currencies{
    label
    symbol
  }
}
`

export const singleProduct = gql`
  query Product($id: String!){
    product(id: $id){
      id
      name
      gallery
      description
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`