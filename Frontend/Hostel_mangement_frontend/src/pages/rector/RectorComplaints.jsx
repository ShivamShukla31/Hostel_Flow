import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RectorLayout from '../../layouts/RectorLayout';
import { problemService } from '../../services/api.service';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from '../../components/Card';
import StatusPill from '../../components/StatusPill';

export default function RectorComplaints() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const data = await problemService.getAllProblems();
      setProblems(data || []);
    } catch (error) {
      setAlert({ type: 'error', message: 'Unable to fetch requests at the moment.' });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await problemService.approveProblem(id);
      setAlert({ type: 'success', message: 'Issue approved successfully.' });
      await fetchProblems();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Unable to approve the issue.' });
    }
  };

  const handleReject = async (id) => {
    try {
      await problemService.rejectProblem(id);
      setAlert({ type: 'success', message: 'Issue rejected successfully.' });
      await fetchProblems();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Unable to reject the issue.' });
    }
  };

  const approvalSummary = problems.reduce(
    (summary, problem) => {
      const status = problem.status || '';
      if (status === 'Pending') summary.pending += 1;
      if (status === 'Approved by Rector') summary.approved += 1;
      if (status === 'Assigned to Worker') summary.assigned += 1;
      if (status === 'In Progress') summary.inProgress += 1;
      if (status === 'Completed') summary.completed += 1;
      if (status === 'Closed') summary.closed += 1;
      return summary;
    },
    {
      total: problems.length,
      pending: 0,
      approved: 0,
      assigned: 0,
      inProgress: 0,
      completed: 0,
      closed: 0
    }
  );

  return (
    <RectorLayout>
      <div className="space-y-8">
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="rounded-[38px] border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-8 shadow-[0_45px_120px_rgba(15,23,42,0.2)] backdrop-blur-3xl"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Rector complaints</p>
              <h1 className="text-4xl font-semibold text-white">Review, approve, or reject issues with premium speed.</h1>
              <p className="max-w-2xl text-slate-300">A high-fidelity complaint hub designed for decisive rector actions and seamless handoff to workers.</p>
            </div>
            <Button
              variant="secondary"
              className="rounded-3xl px-6 py-4 text-sm font-semibold"
              onClick={fetchProblems}
            >
              Refresh queue
            </Button>
          </div>
        </motion.section>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="grid gap-6"
          >
            <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Current queue</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{approvalSummary.pending} pending approvals</h2>
              <p className="mt-3 text-slate-400">Approve or reject complaints to keep the workflow moving.</p>
            </Card>
            <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Total requests</p>
              <p className="mt-5 text-4xl font-semibold text-white">{approvalSummary.total}</p>
              <p className="mt-2 text-slate-400">Complaints submitted by students.</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="grid gap-6"
          >
            <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Approved</p>
              <p className="mt-5 text-4xl font-semibold text-blue-300">{approvalSummary.approved}</p>
              <p className="mt-2 text-slate-400">Requests sent to workers.</p>
            </Card>
            <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Assigned</p>
              <p className="mt-5 text-4xl font-semibold text-emerald-300">{approvalSummary.assigned}</p>
              <p className="mt-2 text-slate-400">Work orders already assigned.</p>
            </Card>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Approval workflow</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Pending complaints</h2>
            </div>
            <Button
              variant="secondary"
              className="rounded-3xl px-5 py-3 text-sm font-semibold"
              onClick={fetchProblems}
            >
              Refresh
            </Button>
          </div>

          {loading ? (
            <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 text-center shadow-2xl">
              <LoadingSpinner text="Loading complaints..." />
            </Card>
          ) : problems.length === 0 ? (
            <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 text-center shadow-2xl">
              <p className="text-lg font-semibold text-white">No complaints available.</p>
              <p className="mt-3 text-slate-400">Waiting for students to submit more problems.</p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {problems.map((problem) => (
                <Card key={problem._id} className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
                  <div className="sm:flex sm:items-start sm:justify-between sm:gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Ticket {problem.tokenId}</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{problem.title}</h3>
                      <p className="mt-2 text-slate-400">{problem.description}</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:items-end">
                      <StatusPill status={problem.status} />
                      <p className="text-sm text-slate-400">Room: {problem.hostel}</p>
                      <p className="text-sm text-slate-400">Priority: {problem.priority}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => handleApprove(problem._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full text-white border-red-500/25 hover:bg-red-500/10"
                      onClick={() => handleReject(problem._id)}
                    >
                      Reject
                    </Button>
                    <span className="inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                      {problem.status === 'Pending' ? 'Ready for decision' : 'Review status'}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </RectorLayout>
  );
}
