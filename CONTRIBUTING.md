# Contributing to Campus Care

Thank you for contributing to Campus Care! This document provides guidelines and best practices for participating in the project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Reporting Issues](#reporting-issues)

## 🚀 Getting Started

1. **Fork the repository** - Create your own copy
2. **Clone your fork** - `git clone https://github.com/your-username/hostel-management.git`
3. **Create a feature branch** - `git checkout -b feature/your-feature-name`
4. **Follow the setup guide** - See [SETUP.md](SETUP.md)

## 🔄 Development Workflow

### Branch Naming Convention

Use descriptive branch names:

```bash
# Feature branches
git checkout -b feature/user-authentication
git checkout -b feature/problem-creation

# Bug fix branches
git checkout -b fix/login-error
git checkout -b fix/cors-issue

# Documentation branches
git checkout -b docs/api-endpoints
git checkout -b docs/setup-guide
```

### Development Steps

1. **Update main branch**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make changes** - Keep commits focused and atomic

4. **Test your changes** - See [Testing](#testing) section

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

6. **Create Pull Request** - See [Pull Request Process](#pull-request-process)

## 💻 Code Standards

### JavaScript/React Standards

```javascript
// ✅ Good - Clear naming, proper formatting
const getUserProblems = async (userId) => {
  try {
    const response = await api.get(`/problems/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch problems:', error);
    throw error;
  }
};

// ❌ Bad - Unclear naming, no error handling
const getProbs = async (id) => {
  const resp = await api.get(`/problems/user/${id}`);
  return resp.data;
};
```

### Naming Conventions

**Functions**
- Use camelCase: `fetchUserData()`, `handleFormSubmit()`
- Prefix with verb: `get`, `fetch`, `create`, `update`, `delete`, `handle`, `validate`

```javascript
// ✅ Good
const handleLoginClick = () => {};
const fetchDashboardStats = async () => {};
const validateEmail = (email) => {};

// ❌ Bad
const click = () => {};
const stats = async () => {};
const email = (e) => {};
```

**Variables**
- Use camelCase: `userName`, `isLoading`, `errorMessage`
- Use descriptive names: `user` instead of `u`, `problems` instead of `probs`

```javascript
// ✅ Good
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

// ❌ Bad
const [loading, setLoading] = useState(false);
const [err, setErr] = useState('');
```

**Constants**
- Use UPPER_SNAKE_CASE: `API_URL`, `MAX_RETRIES`, `DEFAULT_TIMEOUT`

```javascript
// ✅ Good
const API_BASE_URL = 'http://localhost:3000/api';
const JWT_EXPIRES_IN = 3600;

// ❌ Bad
const apiUrl = 'http://localhost:3000/api';
const jwtExpiresIn = 3600;
```

### React Component Standards

```jsx
// ✅ Good - Clear structure, proper hooks usage
import React, { useState, useEffect } from 'react';
import Button from './Button';

const ProblemForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Component side effects
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ title, description });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* JSX content */}
    </form>
  );
};

export default ProblemForm;
```

### Backend Standards (Express)

```javascript
// ✅ Good - Proper structure with error handling
const getProblemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    
    if (!problem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Problem not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: problem
    });
  } catch (error) {
    next(error);
  }
};

// ❌ Bad - Missing error handling
const getProblemById = (req, res) => {
  const problem = Problem.findById(req.params.id);
  res.json(problem);
};
```

## 📝 Commit Message Guidelines

Follow conventional commits format: `<type>(<scope>): <subject>`

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring without feature changes
- `perf:` - Performance improvements
- `test:` - Test additions or changes
- `chore:` - Build process, dependencies, tooling

### Examples

```bash
# Good commit messages
git commit -m "feat(auth): add JWT token refresh mechanism"
git commit -m "fix(cors): allow credentials in preflight requests"
git commit -m "docs(setup): add MongoDB Atlas configuration steps"
git commit -m "refactor(components): extract Button component logic"
git commit -m "test(auth): add login validation tests"

# Bad commit messages
git commit -m "fixed stuff"
git commit -m "WIP: working on things"
git commit -m "asdf"
```

## 🔀 Pull Request Process

### Before Creating PR

1. **Ensure your code is working**
   ```bash
   # Frontend
   npm run build
   npm run lint
   
   # Backend
   npm test
   ```

2. **Update your branch with latest main**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

3. **Push your changes**
   ```bash
   git push origin feature/your-feature
   ```

### PR Title and Description

**Title Format**: `[Type] Brief description`
```
[Feature] Add problem creation page
[Fix] Fix CORS origin validation
[Docs] Update API documentation
```

**Description Template**
```markdown
## Description
Brief description of changes

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How to test these changes

## Related Issues
Closes #123

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Refactoring

## Checklist
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass
```

### PR Review Guidelines

- Address all comments
- Make requested changes
- Push again (don't force push on open PRs)
- Request re-review after updates

## 🧪 Testing

### Frontend Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test problem.test.js
```

### Backend Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test auth.test.js
```

### Manual Testing Checklist

- [ ] Feature works in development
- [ ] No console errors/warnings
- [ ] Responsive on mobile/tablet/desktop
- [ ] Works with different user roles
- [ ] Error handling works
- [ ] Loading states display correctly

## 🐛 Reporting Issues

Use the issue template and include:

1. **Description** - Clear explanation of the issue
2. **Steps to Reproduce** - Exact steps to reproduce
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Screenshots** - If applicable
6. **Environment** - OS, browser, node version, etc.

Example:
```markdown
## Description
Login button doesn't respond on Firefox

## Steps to Reproduce
1. Open page in Firefox
2. Enter valid credentials
3. Click login button

## Expected Behavior
Should redirect to dashboard

## Actual Behavior
Button click does nothing

## Environment
- OS: Windows 10
- Browser: Firefox 120
- Node: 18.17.0
```

## 📚 Documentation

When adding new features:

1. **Update relevant README files**
2. **Add code comments** for complex logic
3. **Document API endpoints** in backend README
4. **Document components** in frontend README
5. **Update SETUP.md** if dependencies change

### Documentation Style

```javascript
/**
 * Generates a unique ticket ID for problem reports
 * @param {string} category - Problem category (maintenance, infrastructure, etc.)
 * @returns {string} Unique ticket ID in format: CAT-YYYY-MM-DD-XXXX
 * @example
 * generateTicketId('maintenance') // Returns: MAI-2024-01-15-0001
 */
const generateTicketId = (category) => {
  // Implementation
};
```

## ✅ Code Review Checklist

Before submitting, verify:

- [ ] Code follows naming conventions
- [ ] Functions are well-documented
- [ ] Error handling is implemented
- [ ] No console.log leftover (except for errors)
- [ ] Commits are clean and descriptive
- [ ] No commented-out code blocks
- [ ] Tests pass
- [ ] No new ESLint warnings

## 🙏 Code of Conduct

- Be respectful and constructive
- Welcome feedback and suggestions
- Help other contributors
- Ask questions if unsure
- Focus on code, not the coder

## 📞 Getting Help

- Check existing issues
- Review documentation in README files
- Ask in PR comments
- Contact maintainers

---

**Thank you for contributing to Campus Care! 🚀**

Your efforts help make hostel management better for everyone.
