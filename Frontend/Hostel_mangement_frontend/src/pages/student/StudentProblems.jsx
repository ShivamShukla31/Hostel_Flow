import React, { useState, useEffect } from 'react';
import { storage, imageHelpers } from '../../utils/helpers';
import { problemService } from '../../services/api.service';
import Navigation from '../../components/Navigation';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import ProblemTracker from '../../components/ProblemTracker';
import Icon from '../../components/Icon';

const StudentProblems = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [problems, setProblems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    hostel: '',
    image: null
  });
  const [imageUploading, setImageUploading] = useState(false);

  const categories = ['Electrical', 'Carpenter', 'Plumbing', 'Cleaning'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const statusColors = {
    'Pending': 'bg-yellow-500/15 text-yellow-200',
    'Approved by Rector': 'bg-blue-500/15 text-blue-200',
    'Assigned to Worker': 'bg-purple-500/15 text-purple-200',
    'In Progress': 'bg-orange-500/15 text-orange-200',
    'Completed': 'bg-green-500/15 text-green-200',
    'Closed': 'bg-slate-500/15 text-slate-200'
  };

  const statusAccent = {
    'Pending': 'border-yellow-400/60',
    'Approved by Rector': 'border-blue-400/60',
    'Assigned to Worker': 'border-purple-400/60',
    'In Progress': 'border-orange-400/60',
    'Completed': 'border-green-400/60',
    'Closed': 'border-slate-400/60'
  };

  const problemSummary = problems.reduce((summary, problem) => {
    const status = problem.status || '';
    if (status.includes('Pending')) summary.pending += 1;
    if (status.includes('Approved')) summary.approved += 1;
    if (status.includes('Assigned')) summary.assigned += 1;
    if (status.includes('In Progress')) summary.inProgress += 1;
    if (status.includes('Completed')) summary.completed += 1;
    if (status.includes('Closed')) summary.closed += 1;
    return summary;
  }, {
    total: problems.length,
    pending: 0,
    approved: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
    closed: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = storage.getUser();
        setUser(userData);
        await fetchProblems();
        setLoading(false);
      } catch {
        setAlert({ type: 'error', message: 'Failed to load data' });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProblems = async () => {
    try {
      const data = await problemService.getMyProblems();
      setProblems(data || []);
    } catch {
      setAlert({ type: 'error', message: 'Failed to load problems' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Validate image
      imageHelpers.validateImage(file);

      setImageUploading(true);

      // Compress image
      const compressedBlob = await imageHelpers.compressImage(file);

      // Create a new File object from the compressed blob
      const compressedFile = new File([compressedBlob], file.name, {
        type: 'image/jpeg',
        lastModified: Date.now()
      });

      setFormData(prev => ({ ...prev, image: compressedFile }));
      setImageUploading(false);
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
      // Clear the file input
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = await problemService.createProblem(formData);
      const createdProblem = data;

      // Show detailed success message with image
      setAlert({
        type: 'success',
        message: (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800">Problem Reported Successfully! 🎉</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="font-medium">Ticket ID:</span> {createdProblem.tokenId}</p>
                <p><span className="font-medium">Date:</span> {new Date(createdProblem.createdAt).toLocaleDateString()}</p>
                <p><span className="font-medium">Priority:</span> {createdProblem.priority}</p>
                <p><span className="font-medium">Status:</span> {createdProblem.status}</p>
              </div>
            </div>
            {createdProblem.problemImage && (
              <div className="flex justify-center">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-300 mb-2">Submitted Image:</p>
                  <img
                    src={createdProblem.problemImage}
                    alt="Submitted problem"
                    className="max-w-xs rounded-lg shadow-md border"
                  />
                </div>
              </div>
            )}
          </div>
        )
      });

      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'Medium',
        hostel: '',
        image: null
      });
      await fetchProblems();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to report problem' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmResolution = async (problemId) => {
    try {
      await problemService.updateProblemStatus(problemId, 'Closed');
      setAlert({ type: 'success', message: 'Problem marked resolved and closed successfully.' });
      await fetchProblems();
    } catch {
      setAlert({ type: 'error', message: 'Failed to confirm resolution.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <LoadingSpinner text="Loading Problems..." />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-950 text-white"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.96)), url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Navigation */}
      <Navigation user={user} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            duration={alert.type === 'success' ? 10000 : 5000}
          />
        )}

        {/* Header */}
        <div className="space-y-6 mb-8">
          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr] items-end">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/80 px-4 py-2 shadow-sm border border-white/10">
                <Icon name="report" className="h-6 w-6 text-cyan-300" />
                <div>
                  <h2 className="text-3xl font-semibold text-white">My Problem Reports</h2>
                  <p className="text-slate-300 text-sm">Track your issues and stay updated on every request.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="bg-slate-900/90 border border-white/10 p-4 shadow-lg">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Total</p>
                  <p className="text-3xl font-bold text-white mt-2">{problemSummary.total}</p>
                </Card>
                <Card className="bg-slate-900/90 border border-white/10 p-4 shadow-lg">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Pending</p>
                  <p className="text-3xl font-bold text-yellow-300 mt-2">{problemSummary.pending}</p>
                </Card>
                <Card className="bg-slate-900/90 border border-white/10 p-4 shadow-lg">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Completed</p>
                  <p className="text-3xl font-bold text-green-300 mt-2">{problemSummary.completed}</p>
                </Card>
                <Card className="bg-slate-900/90 border border-white/10 p-4 shadow-lg">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">In Progress</p>
                  <p className="text-3xl font-bold text-orange-300 mt-2">{problemSummary.inProgress}</p>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button
                variant="primary"
                className="inline-flex items-center gap-2 w-full max-w-xs"
                onClick={() => setShowForm(!showForm)}
              >
                <Icon name="report" className="h-5 w-5 text-white" />
                {showForm ? 'Cancel' : 'Report New Problem'}
              </Button>
            </div>
          </div>
        </div>

        {/* Report Form */}
        {showForm && (
          <Card className="mb-8 bg-slate-900/90 border border-white/10 text-white shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Report New Problem</h3>
                <p className="text-sm text-slate-400 mt-1">Submit a new maintenance request with details and an optional image.</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">Quick report</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief title of the problem"
                />
                <Input
                  label="Hostel"
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleInputChange}
                  required
                  placeholder="Your hostel name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  options={categories.map(cat => ({ value: cat, label: cat }))}
                />
                <Select
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  options={priorities.map(pri => ({ value: pri, label: pri }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the problem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Problem Image (Optional)
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-500/40 rounded-xl px-4 py-8 text-center cursor-pointer hover:border-blue-400 transition bg-slate-900/70">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">
                    {imageUploading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    ) : (
                      <Icon name="camera" className="h-6 w-6" />
                    )}
                  </div>
                  <span className="mt-3 text-sm text-slate-600">
                    {imageUploading ? 'Compressing image...' : 'Attach a photo to show the problem clearly'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={imageUploading}
                    className="hidden"
                  />
                </label>
                {formData.image && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-300 mb-2">Preview</p>
                    <div className="rounded-xl overflow-hidden border border-slate-700 shadow-sm max-w-xs">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Selected problem"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Report'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Problems List */}
        <div className="space-y-4">
          {problems.length === 0 ? (
            <Card className="bg-slate-900/90 border border-white/10 text-white shadow-xl">
              <div className="text-center py-8">
                <p className="text-slate-300 text-lg">No problems reported yet.</p>
                <p className="text-slate-400 mt-2">Click "Report New Problem" to get started.</p>
              </div>
            </Card>
          ) : (
            problems.map((problem) => (
              <Card key={problem._id} className="hover:-translate-y-1 hover:shadow-2xl transition-transform duration-200 bg-slate-900/90 border border-white/10 text-white rounded-3xl">
                <div className={`flex flex-col gap-4 md:flex-row md:justify-between md:items-start mb-4 border-l-4 ${statusAccent[problem.status] || 'border-slate-500/50'} pl-4`}> 
                  <div>
                    <h3 className="text-xl font-semibold text-white">{problem.title}</h3>
                    <p className="text-slate-400 mt-1">Ticket: {problem.tokenId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[problem.status] || 'bg-slate-700 text-slate-100'}`}>
                    {problem.status}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{problem.description}</p>

                {/* Progress Tracker */}
                <div className="mb-4">
                  <ProblemTracker status={problem.status} />
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl bg-slate-950/80 p-3 border border-white/10">
                    <span className="font-semibold text-slate-400">Category</span>
                    <p className="text-slate-200 mt-1">{problem.department}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/80 p-3 border border-white/10">
                    <span className="font-semibold text-slate-400">Priority</span>
                    <p className="text-slate-200 mt-1">{problem.priority}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/80 p-3 border border-white/10">
                    <span className="font-semibold text-slate-400">Created</span>
                    <p className="text-slate-200 mt-1">{new Date(problem.createdAt).toLocaleDateString()}</p>
                  </div>
                  {problem.assignedWorker && (
                    <div className="rounded-2xl bg-slate-950/80 p-3 border border-white/10">
                      <span className="font-semibold text-slate-400">Assigned To</span>
                      <p className="text-slate-200 mt-1">{problem.assignedWorker.name}</p>
                    </div>
                  )}
                </div>
                {problem.problemImage && (
                  <div className="mt-4">
                    <img
                      src={problem.problemImage}
                      alt="Problem"
                      className="max-w-md rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-sm text-slate-400 mt-2">
                      Image failed to load
                    </div>
                  </div>
                )}
                {String(problem.status).trim().toLowerCase() === 'completed' && (
                  <div className="mt-4 flex gap-4">
                    <Button
                      variant="success"
                      size="sm"
                      className="inline-flex items-center gap-2"
                      onClick={() => handleConfirmResolution(problem._id)}
                    >
                      <Icon name="check" className="h-4 w-4 text-white" />
                      Confirm Resolution
                    </Button>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProblems;