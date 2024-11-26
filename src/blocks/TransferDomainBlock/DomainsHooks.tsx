import { useState, useEffect } from 'react';
import * as Sentry from "@sentry/nextjs";

export interface postRequestProps {
  forDomain: string;
  postRequest: any;
}
export interface coreAttributesProps {
  RegistrantAddress1: any;
  RegistrantCity: any;
  RegistrantCountry: any;
  RegistrantEmailAddress: any;
  RegistrantFirstName: any;
  RegistrantLastName: any;
  RegistrantOrganization: any;
  RegistrantPostalCode: any;
}

export interface additionalAttributesProps {
  ID: string;
  Name: string;
  Application: string;
  UserDefined: boolean;
  Required: string;
  Description: string;
  IsChild: string;
  Options: any;
}

function getUniqueSet(additionalAttributes: additionalAttributesProps[]) {
  const uniqueIds: additionalAttributesProps[] = [];
  const uniqueAttributes = additionalAttributes.filter((element) => {
    const isDuplicate = uniqueIds.includes(
      element.Name as unknown as additionalAttributesProps
    );
    if (!isDuplicate && element.Name) {
      uniqueIds.push(element.Name as unknown as additionalAttributesProps);
      return true;
    }
    return false;
  });
  return uniqueAttributes;
}

function useDomainsNameHook(domains: string[]) {
  const [coreAttributes, setCoreAttributes] = useState<coreAttributesProps>();
  const [additionalAttributes, setAdditionalAttributes] = useState<
    additionalAttributesProps[]
  >([]);
  const [postRequests, setPostRequests] = useState<postRequestProps[]>([]);
  useEffect(() => {
    void fetch('/api/coreDomainRegistrationAttributes', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domain: domains[0] }),
    })
      .then((response) => response.json())
      .then((response) => {
        setCoreAttributes(response.properties.registration.properties);
      })
      .catch((err) => Sentry.captureException(err));

    domains.map((domain) => {
      void fetch('/api/domainRegistrationAttributes', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: domain }),
      })
        .then((response) => response.json())
        .then((response) => {
          setPostRequests(
            postRequests.push([
              domain,
              response,
            ] as unknown as postRequestProps) as unknown as postRequestProps[]
          );
          if (response.Attribute) {
            if (response.Attribute.length > 1) {
              for (const Attribute of response.Attribute) {
                setAdditionalAttributes(
                  additionalAttributes.push(
                    Attribute
                  ) as unknown as additionalAttributesProps[]
                );
              }
            }
            setAdditionalAttributes(
              additionalAttributes.push(
                response.Attribute
              ) as unknown as additionalAttributesProps[]
            );
          }
        })

        .then(() => {
          setPostRequests(postRequests);
          setAdditionalAttributes(getUniqueSet(additionalAttributes));
        })
        .catch((err) => Sentry.captureException(err));
    });
  }, [domains.length]);

  if (coreAttributes) {
    return [coreAttributes, additionalAttributes, postRequests];
  }
}

export default useDomainsNameHook;

// import { useState, useEffect } from 'react';

// export interface postRequestProps {
//   forDomain: string;
//   postRequest: any;
// }

// export interface CoreAttribute {
//   type: string;
//   minLength: number;
//   maxLength: number;
//   title: string;
// }

// export interface CoreCountry {
//   enum: string[];
//   enum_titles: string[];
//   type: string;
//   title: string;
// }

// export interface CoreAttributesResponse {
//   properties: {
//     registration: {
//       properties: CoreAttributesProps;
//     };
//   };
// }

// export interface AdditionalAttributesResponse {
//   Attribute?: AdditionalAttributesProps[];
// }

// export interface CoreAttributesProps {
//   RegistrantAddress1: CoreAttribute;
//   RegistrantCity: CoreAttribute;
//   RegistrantCountry: CoreCountry;
//   RegistrantEmailAddress: CoreAttribute;
//   RegistrantFirstName: CoreAttribute;
//   RegistrantLastName: CoreAttribute;
//   RegistrantOrganization: CoreAttribute;
//   RegistrantPostalCode: CoreAttribute;
// }

// export interface AdditionalAttributesProps {
//   ID: string;
//   Name: string;
//   Application: string;
//   UserDefined: boolean;
//   Required: string;
//   Description: string;
//   IsChild: string;
//   Options: any;
// }

// function getUniqueSet(additionalAttributes: AdditionalAttributesProps[]) {
//   const uniqueIds: AdditionalAttributesProps[] = [];
//   const uniqueAttributes = additionalAttributes.filter((element) => {
//     const isDuplicate = uniqueIds.includes(
//       element.Name as unknown as AdditionalAttributesProps
//     );
//     if (!isDuplicate && element.Name) {
//       uniqueIds.push(element.Name as unknown as AdditionalAttributesProps);
//       return true;
//     }
//     return false;
//   });
//   return uniqueAttributes;
// }

// function useDomainsNameHook(domains: string[]) {
//   const [coreAttributes, setCoreAttributes] = useState<CoreAttributesProps>();
//   const [additionalAttributes, setAdditionalAttributes] = useState<
//     AdditionalAttributesProps[]
//   >([]);
//   const [postRequests, setPostRequests] = useState<postRequestProps[]>([]);
//   useEffect(() => {
//     void fetch('/api/coreDomainRegistrationAttributes', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json, text/plain, */*',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ domain: domains[0] }),
//     })
//       .then((response) => response.json())
//       .then((response: CoreAttributesResponse) => {
//         setCoreAttributes(response.properties.registration.properties);
//       })
//       .catch((err) => console.error(err));

//     domains.map((domain) => {
//       void fetch('/api/domainRegistrationAttributes', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json, text/plain, */*',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ domain: domain }),
//       })
//         .then((response) => response.json())
//         .then((response: AdditionalAttributesResponse) => {
//           setPostRequests(
//             postRequests.push([
//               domain,
//               response,
//             ] as unknown as postRequestProps) as unknown as postRequestProps[]
//           );
//           if (response.Attribute) {
//             if (response.Attribute.length > 1) {
//               for (const Attribute of response.Attribute) {
//                 setAdditionalAttributes(
//                   additionalAttributes.push(
//                     Attribute
//                   ) as unknown as AdditionalAttributesProps[]
//                 );
//               }
//             } else {
//               setAdditionalAttributes(
//                 additionalAttributes.push(
//                   response.Attribute[0]
//                 ) as unknown as AdditionalAttributesProps[]
//               );
//             }
//           }
//         })

//         .then(() => {
//           setPostRequests(postRequests);
//           setAdditionalAttributes(getUniqueSet(additionalAttributes));
//         })
//         .catch((err) => console.error(err));
//     });
//   }, [domains.length]);

//   if (coreAttributes) {
//     return [coreAttributes, additionalAttributes, postRequests];
//   }
// }

// export default useDomainsNameHook;
