import { arrayBufferTBase64, fileToBase64 } from "./files";
import { timer } from "./timer";

// TODO : Move to server
const ACCOUNT_ID = "bb38c112-3960-4e42-a155-5f9bff63c529";

export const generateEnvelope = async (pdf, emails, imageList) => {
  const base64Pdf = arrayBufferTBase64(pdf);

  const imageBase64 = [];
  for (let i = 0; i < imageList.length; i++) {
    const base64 = await fileToBase64(imageList[i]);
    imageBase64.push(base64);
  }

  const envelope = {
    status: "created",
    emailSubject: "Approval of camera trap data",
    documents: [
      {
        display: "inline",
        documentBase64: base64Pdf,
        documentId: "1",
        name: "document 1",
      },
    ],
    recipients: {
      signers: emails.map((element, index) => ({
        email: element,
        name: element,
        recipientId: (index + 1).toString(),
      })),
    },
  };

  const accessToken = await getAccessToken();

  debugger;

  console.log(JSON.stringify(envelope));

  const response = await fetch(
    `https://demo.docusign.net/restapi/v2.1/accounts/${ACCOUNT_ID}/envelopes`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(envelope),
    }
  );

  console.log(response);
};

// TODO: Move this to server
const getAccessToken = async () => {
  let result = null;

  try {
    const response = await fetch("https://account-d.docusign.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMjE2ODIyYy1kODZjLTQ4YTYtODU3OC01NzU5ZDQxMDE2ZWIiLCJzdWIiOiI0ZTYyYmE4ZS02M2ZmLTRhODAtODFjYS1iYjYzNjNlYTMxZGMiLCJhdWQiOiJhY2NvdW50LWQuZG9jdXNpZ24uY29tIiwiaWF0IjoiMTY1OTg5MTQ1MyIsImV4cCI6IjE2OTE0MjY0NDEiLCJzY29wZSI6InNpZ25hdHVyZSJ9.jceB-uVcvjMzR79vTr9CdkiYfZy_ud6kyXrO84ScSSB-704yom-I_ZCB6vk8FA1VqznPS_JnC1q0jM6TWuJMskL_XCwF2BsPCU_aOzQRU3T8ShIFL7MTuH_gUFGsxB8wfFdRTrUQUDAzvtr4mrt523IniPtHBeplkND5O7WK6336ZN_O6fH55El9-_CdLI9sfHG3pK5TAbHRP1dtTE4nlXTLnapj6mk97_4ub0C0FRi8gHMDjGsgX6S5ebGmjaAjNhnLs3x9aJ7T7pcXbm2whQCpH65ZaF9FnVCFYfeGUkt2ager0hnJhm_sMs-SdY5csI9nzbpcON30xbS6B-55iA",
      }),
    });

    if (response.ok) {
      const json = await response.json();

      console.log(json);

      result = json.access_token;
    }
  } catch (error) {
    console.log(error);
  }

  return result;
};
