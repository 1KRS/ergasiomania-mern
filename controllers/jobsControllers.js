const createJob = async (req, res) => {
  res.send('Create Job');
};
const deleteJob = async (req, res) => {
  res.send('Delete Job');
};
const updateJob = async (req, res) => {
  res.send('Update Job');
};
const getAllJobs = async (req, res) => {
  res.send('Get All Jobs');
};
const showStats = async (req, res) => {
  res.send('Show Stats');
};

export { createJob, deleteJob, updateJob, getAllJobs, showStats };
