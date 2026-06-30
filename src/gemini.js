
export async function getProductivityAdvice(tasks) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const totalTasks = tasks.length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const dueSoon = tasks.filter((task) => {
    const days =
      (new Date(task.deadline) - new Date()) /
      (1000 * 60 * 60 * 24);

    return days >= 0 && days <= 3;
  }).length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = totalTasks - completed;

  let advice = `📋 Productivity Report

━━━━━━━━━━━━━━━━━━━━━━

✅ Total Tasks: ${totalTasks}
✔ Completed: ${completed}
🕒 Pending: ${pending}
🔥 High Priority: ${highPriority}
⚠ Due Soon: ${dueSoon}

━━━━━━━━━━━━━━━━━━━━━━

`;

  if (highPriority > 2) {
    advice +=
      "• Focus on your high-priority tasks before anything else.\n";
  }

  if (dueSoon > 0) {
    advice +=
      "• You have deadlines approaching. Finish those first.\n";
  }

  if (pending > completed) {
    advice +=
      "• Break large tasks into smaller milestones.\n";
  }

  if (completed > pending) {
    advice +=
      "• Great progress! Keep your momentum going.\n";
  }

  advice +=
    "\n💡 Tip: Work in 25-minute Pomodoro sessions and take a 5-minute break after each session.";

  return advice;
}