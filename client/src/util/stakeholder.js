export const newStakeHolder = (
  email,
  envelopeStatus = null,
  comments = null
) => {
  return {
    email: email,
    envelopeStatus: envelopeStatus,
    comments: comments,
  };
};
