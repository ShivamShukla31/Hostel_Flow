import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RectorLayout from '../../layouts/RectorLayout';
import { problemService } from '../../services/api.service';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from '../../components/Card';
import Select from '../../components/Select';

export default function RectorAssignments() {
  const [problems, setProblems] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState({});
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [allProblems, workerList] = await Promise.all([
        problemService.getAllProblems(),
        problemService.getWorkers()
      ]);
      setProblems(allProblems || []);
      setWorkers(workerList || []);
    } catch (error) {
      setAlert({ type: 'error', message: 'Unable to load assignment queue.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (problemId) => {
    const workerId = selectedWorker[problemId];
    if (!workerId) {
      setAlert({ type: 'warning', message: 'Select a worker before assigning.' });
      return;
    }

    setAssigning(problemId);
    try {
      await problemService.assignWorker(problemId, workerId);
      setAlert({ type: 'success', message: 'Worker assigned successfully.' });
      setSelectedWorker((prev) => ({ ...prev, [problemId]: '' }));
      fetchData();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Unable to assign worker.' });
    } finally {
      setAssigning(null);
    }
  };

  const assignmentProblems = problems.filter(
    (problem) => problem.status === 'Approved by Rector' || problem.status === 'Approved'
  );

  return (
    <RectorLayout>
      <div className="space-y-8">
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="rounded-[38px] border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-8 shadow-[0_45px_120px_rgba(15,23,42,0.2)] backdrop-blur-3xl"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.32em] text-violet-300">Assign workers</p>
              <h1 className="text-4xl font-semibold text-white">Deploy maintenance agents with one flow.</h1>
              <p className="max-w-2xl text-slate-300">Choose the right worker for each approved complaint and keep inspection cycles compact.</p>
            </div>
            <Button
              variant="secondary"
              className="rounded-3xl px-6 py-4 text-sm font-semibold"
              onClick={fetchData}
            >
              Refresh queue
            </Button>
          </div>
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Team roster</p>
                <p className="mt-4 text-4xl font-semibold text-cyan-300">{workers.length}</p>
                <p className="mt-2 text-slate-400">Available workers ready for assignment.</p>
              </Card>
              <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Assignment queue</p>
                <p className="mt-4 text-4xl font-semibold text-emerald-300">{assignmentProblems.length}</p>
                <p className="mt-2 text-slate-400">Complaints waiting for deployment.</p>
              </Card>
            </div>

            {loading ? (
              <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 text-center shadow-2xl">
                <LoadingSpinner text="Loading worker assignments..." />
              </Card>
            ) : assignmentProblems.length === 0 ? (
              <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 text-center shadow-2xl">
                <p className="text-lg font-semibold text-white">No assignment-ready complaints.</p>
                <p className="mt-3 text-slate-400">Approve complaints first to assign them to workers.</p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {assignmentProblems.map((problem) => (
                  <Card key={problem._id} className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
                    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                      <div className="space-y-3">
                        <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Ticket {problem.tokenId}</div>
                        <h2 className="text-2xl font-semibold text-white">{problem.title}</h2>
                        <p className="text-slate-400">{problem.description}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                          <span className="rounded-3xl border border-white/10 bg-white/5 px-3 py-2">Hostel {problem.hostel}</span>
                          <span className="rounded-3xl border border-white/10 bg-white/5 px-3 py-2">Priority {problem.priority}</span>
                          <span className="rounded-3xl border border-white/10 bg-white/5 px-3 py-2">Status: {problem.status}</span>
                        </div>
                      </div>
                      <div className="space-y-4 rounded-[28px] border border-white/10 bg-slate-950/80 p-4">
                        <Select
                          label="Assign worker"
                          name={problem._id}
                          value={selectedWorker[problem._id] || ''}
                          onChange={(e) => setSelectedWorker((prev) => ({ ...prev, [problem._id]: e.target.value }))}
                          options={workers.map((worker) => ({ value: worker._id, label: worker.name }))}
                          className="bg-slate-900"
                        />
                        <Button
                          variant="primary"
                          className="w-full rounded-3xl px-5 py-3 text-sm font-semibold"
                          onClick={() => handleAssign(problem._id)}
                          disabled={assigning === problem._id}
                          loading={assigning === problem._id}
                        >
                          Assign worker
                        </Button>
                        {problem.assignedWorker && (
                          <p className="text-sm text-slate-400">Currently assigned to: <span className="font-semibold text-white">{problem.assignedWorker.name}</span></p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Assignment notes</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Assign with confidence</h2>
            <p className="mt-3 text-slate-400">Select the best worker for each task based on availability and complaint priority. Your choices are instantly reflected in the queue.</p>
            <div className="mt-6 grid gap-4 text-sm text-slate-300">
              <p>• Only approved complaints can be assigned to workers.</p>
              <p>• Use the worker roster to manage load across the maintenance team.</p>
              <p>• Refresh if a worker list or ticket status changes after submission.</p>
            </div>
          </Card>
        </section>
      </div>
    </RectorLayout>
  );
}
