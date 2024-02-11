const getApiStatus = async (req, res) =>
  res.status(200).json({
    success: true,
    message: "API is working.",
  });

export default getApiStatus;
