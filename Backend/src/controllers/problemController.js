import {Problem} from "../models/problem.model.js";
import User from "../models/users.model.js";
import {asyncHandler} from "../middleware/asyncHandler.js";
import { STATUS } from "../utils/constants.js";
import {ApiError} from "../utils/Api_Error.js";


const formatProblemImage = (problem, req) => {
    const imageValue = problem.problemImage;
    const formattedImage = imageValue
        ? imageValue.startsWith('http')
            ? imageValue
            : `${req.protocol}://${req.get('host')}/temp/${imageValue}`
        : null;

    return {
        ...problem.toObject(),
        problemImage: formattedImage
    };
};

export const createProblem = asyncHandler(async (req, res) => {

    const problem = await Problem.create({
        student: req.user._id,
        hostel: req.body.hostel,
        title: req.body.title,
        description: req.body.description,
        department: req.body.department,
        priority: req.body.priority || 'Medium',
        problemImage: req.file ? req.file.filename : null,
        status: STATUS.PENDING
    });

    const formattedProblem = formatProblemImage(problem, req);

    res.status(201).json(formattedProblem);
});

export const approveProblem = asyncHandler(async (req, res) => {

    const problem = await Problem.findById(req.params.id);

    if (!problem) {
        return new ApiError("Problem not found", 404);
    }

    problem.status = STATUS.APPROVED;

    problem.history.push({
        action: "Approved by Rector",
        updatedBy: req.user._id
    });

    await problem.save();

    res.json(problem);
});

export const rejectProblem = asyncHandler(async (req, res) => {

    const problem = await Problem.findById(req.params.id);

    if (!problem) {
        return new ApiError("Problem not found", 404);
    }

    problem.status = STATUS.REJECTED;

    problem.history.push({
        action: "Rejected by Rector",
        updatedBy: req.user._id
    });

    await problem.save();

    res.json(problem);
});

export const closeProblem = asyncHandler(async (req, res) => {

    const problem = await Problem.findById(req.params.id);

    if (!problem) {
        return new ApiError("Problem not found", 404);
    }

    problem.status = STATUS.CLOSED;

    problem.history.push({
        action: "Closed by Rector",
        updatedBy: req.user._id
    });

    await problem.save();

    res.json(problem);
});


export const assignWorker = asyncHandler(async (req, res) => {

    const { workerId } = req.body;

    const problem = await Problem.findById(req.params.id);

    problem.assignedWorker = workerId;
    problem.status = STATUS.ASSIGNED;

    problem.history.push({
        action: "Assigned to Worker",
        updatedBy: req.user._id
    });

    await problem.save();

    res.json(problem);
});

export const updateStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;
    const problem = req.problem; // from middleware

    if (req.user.role === 'Student' && problem.student.toString() !== req.user._id.toString()) {
        throw new ApiError('Unauthorized to update this problem', 403);
    }

    problem.status = status;

    problem.history.push({
        action: `Status changed to ${status}`,
        updatedBy: req.user._id
    });

    await problem.save();

    res.json(problem);
});

export const getMyProblems = asyncHandler(async (req, res) => {

    const problems = await Problem.find({ student: req.user._id })
        .populate("assignedWorker", "name role")
        .sort({ createdAt: -1 });

    const formattedProblems = problems.map(problem => formatProblemImage(problem, req));

    res.json(formattedProblems);
});

export const getAllProblems = asyncHandler(async (req, res) => {

    const problems = await Problem.find()
        .populate("student", "name email")
        .populate("assignedWorker", "name role")
        .sort({ createdAt: -1 });

    const formattedProblems = problems.map(problem => formatProblemImage(problem, req));

    res.json(formattedProblems);
});

export const profile = asyncHandler(async (req, res) => {

    const user = req.user;
    res.json({
        name: user.name,
        email: user.email,
        role: user.role
    });
});

export const getIssueStats = asyncHandler(async (req, res) => {

    const total = await Problem.countDocuments({ student: req.user._id });
    const pending = await Problem.countDocuments({ student: req.user._id, status: STATUS.PENDING });
    const approved = await Problem.countDocuments({ student: req.user._id, status: STATUS.APPROVED });
    const assigned = await Problem.countDocuments({ student: req.user._id, status: STATUS.ASSIGNED });
    const inProgress = await Problem.countDocuments({ student: req.user._id, status: STATUS.IN_PROGRESS });
    const completed = await Problem.countDocuments({ student: req.user._id, status: STATUS.COMPLETED });
    const closed = await Problem.countDocuments({ student: req.user._id, status: STATUS.CLOSED });

    res.json({
        total,
        pending,
        approved,
        assigned,
        inProgress,
        completed,
        closed
    });
});

export const getWorkers = asyncHandler(async (req, res) => {

    const workers = await User.find({ role: 'Worker' })
        .select('name email _id')
        .sort({ name: 1 });

    res.json(workers);
});

export const getAssignedProblems = asyncHandler(async (req, res) => {

    const problems = await Problem.find({ assignedWorker: req.user._id })
        .populate("student", "name email mobile")
        .populate("assignedWorker", "name role")
        .sort({ createdAt: -1 });

    const formattedProblems = problems.map(problem => formatProblemImage(problem, req));

    res.json(formattedProblems);
});

export const getDashboardStats = asyncHandler(async (req, res) => { 
    const total = await Problem.countDocuments();
    const pending = await Problem.countDocuments({ status: STATUS.PENDING });
    const approved = await Problem.countDocuments({ status: STATUS.APPROVED });
    const assigned = await Problem.countDocuments({ status: STATUS.ASSIGNED });
    const inProgress = await Problem.countDocuments({ status: STATUS.IN_PROGRESS });
    const completed = await Problem.countDocuments({ status: STATUS.COMPLETED });
    const closed = await Problem.countDocuments({ status: STATUS.CLOSED });

    res.json({
        total,
        pending,    
        approved,
        assigned,
        inProgress,
        completed,
        closed
    });
});