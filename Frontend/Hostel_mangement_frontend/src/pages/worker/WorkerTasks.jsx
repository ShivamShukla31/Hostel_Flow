import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import WorkerTaskCard from '../../components/WorkerTaskCard';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import { problemService } from '../../services/api.service';

const notifications = [
  { title: 'New task assigned', detail: 'A new plumbing issue was assigned by the rector.', time: '2m ago' },
  { title: 'Review requested', detail: 'Completed work on T-947 needs confirmation from student.', time: '1h ago' },
  { title: 'System alert', detail: 'Your efficiency score has improved by 6% over the last week.', time: '3h ago' }
];

const filterButtons = [
  { label: 'All', value: 'all' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'In Progress', value: 'inprogress' },
  { label: 'Completed', value: 'completed' }
];

export default function WorkerTasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const view = searchParams.get('filter') || 'all';
  const showNotifications = searchParams.get('view') === 'notifications';

  const setFilterView = (filterValue) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('filter', filterValue);
    setSearchParams(nextParams);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setAlert(null);

    try {
      const assignedProblems = await problemService.getAssignedProblems();
      const normalizedTasks = (assignedProblems || []).map((problem) => ({
        _id: problem._id,
        id: problem._id,
        tokenId: problem.tokenId,
        title: problem.title,
        student: typeof problem.student === 'object' ? problem.student.name : problem.student || 'Resident',
        room: problem.hostel || 'N/A',
        category: problem.department || problem.category || 'Maintenance',
        description: problem.description,
        priority: problem.priority,
        createdAt: problem.createdAt,
        status: problem.status,
        problemImage: problem.problemImage,
        progress: problem.status === 'Completed' ? 100 : problem.status === 'In Progress' ? 55 : 20,
        proofStatus: problem.status === 'Completed' ? 'Proof uploaded' : 'Upload required'
      }));
      setTasks(normalizedTasks);
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Unable to load your assigned complaints.' });
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (view === 'completed') return task.status === 'Completed';
    if (view === 'assigned') return task.status === 'Assigned' || task.status === 'Assigned to Worker';
    if (view === 'inprogress') return task.status === 'In Progress';
    return true;
  });

  const updateTaskStatus = async (taskId, status) => {
    try {
      await problemService.updateProblemStatus(taskId, status);
      setActiveTask(`${taskId}: ${status}`);
      await loadTasks();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Unable to update task status.' });
    }
  };

  const handleAction = async (task, actionType) => {
    const taskId = task._id || task.id;

    if (actionType === 'start') {
      if (task.status === 'Assigned' || task.status === 'Assigned to Worker') {
        await updateTaskStatus(taskId, 'In Progress');
      } else {
        setAlert({ type: 'warning', message: 'Task can only be started when it is assigned.' });
      }
    } else if (actionType === 'update') {
      if (task.status === 'Assigned' || task.status === 'Assigned to Worker') {
        await updateTaskStatus(taskId, 'In Progress');
      } else if (task.status === 'In Progress') {
        await loadTasks();
        setAlert({ type: 'success', message: 'Progress refreshed for the current task.' });
      } else {
        setAlert({ type: 'warning', message: 'Only assigned or in-progress tasks can be updated.' });
      }
    } else if (actionType === 'complete') {
      if (task.status === 'In Progress') {
        await updateTaskStatus(taskId, 'Completed');
      } else {
        setAlert({ type: 'warning', message: 'Only tasks in progress can be marked complete.' });
      }
    }
  };

  const openTasksPage = () => {
    // no-op: already on worker task page, but kept for button consistency
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]"
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-3 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Worker task center</p>
              <h1 className="text-4xl font-semibold text-white">Assigned complaints and work orders</h1>
              <p className="text-slate-300">Manage every complaint assigned through the rector, update statuses in real time, and keep your task pipeline flowing smoothly.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="assign" size="sm" onClick={loadTasks}>Sync tasks</Button>
            </div>
          </div>
        </motion.section>

        {showNotifications ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease: 'easeOut' }}
            className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]"
          >
            <Card className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Notifications</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Live operations feed</h2>
              <div className="mt-6 space-y-4">
                {notifications.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-white">{item.title}</p>
                      <span className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.time}</span>
                    </div>
                    <p className="mt-2 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Action center</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Notification quick actions</h2>
              <div className="mt-6 grid gap-4">
                {notifications.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-slate-300">
                    <p>{item.title}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease: 'easeOut' }}
            className="grid gap-6"
          >
            <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
              <Card className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Task pipeline</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">Current assigned complaints</h2>
                    <p className="mt-2 text-slate-300">Update status quickly for complaints assigned by the rector.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-950/90 p-4 border border-white/10">
                      <p className="text-sm text-slate-400">Open tasks</p>
                      <p className="mt-3 text-3xl font-semibold text-blue-300">{filteredTasks.length}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-950/90 p-4 border border-white/10">
                      <p className="text-sm text-slate-400">Completed</p>
                      <p className="mt-3 text-3xl font-semibold text-emerald-300">{tasks.filter((task) => task.status === 'Completed').length}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Workflow filter</p>
                <div className="mt-5 grid gap-3">
                  {filterButtons.map((filter) => (
                    <Button
                      key={filter.value}
                      variant={view === filter.value ? 'primary' : 'secondary'}
                      size="sm"
                      fullWidth
                      onClick={() => setFilterView(filter.value)}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>

            {loading ? (
              <Card className="rounded-[32px] border border-white/10 bg-slate-950/85 p-10 text-center shadow-[0_40px_120px_rgba(15,23,42,0.18)] text-slate-400">
                <LoadingSpinner text="Loading your assigned complaints..." />
              </Card>
            ) : filteredTasks.length === 0 ? (
              <Card className="rounded-[32px] border border-white/10 bg-slate-950/85 p-10 text-center shadow-[0_40px_120px_rgba(15,23,42,0.18)] text-slate-400">
                No complaints have been assigned to you yet.
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <WorkerTaskCard
                    key={task._id || task.id}
                    task={task}
                    onStart={() => handleAction(task, 'start')}
                    onUpdate={() => handleAction(task, 'update')}
                    onComplete={() => handleAction(task, 'complete')}
                  />
                ))}
              </div>
            )}
          </motion.section>
        )}

        {activeTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[32px] border border-cyan-500/20 bg-cyan-500/10 p-5 text-cyan-100"
          >
            <p className="text-sm font-medium">Latest action:</p>
            <p className="mt-2 text-lg font-semibold">{activeTask}</p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
