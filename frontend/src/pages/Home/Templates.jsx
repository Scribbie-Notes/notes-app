export const templates = {
    meeting: {
      title: "Meeting Notes",
      content: `
        <p>Date: [Enter date]</p>
        <p>Attendees: [Enter attendees]</p>

        <h3>Agenda:</h3>
        <ol>
          <li>[Enter agenda item]</li>
          <li>[Enter agenda item]</li>
        </ol>

        <h3>Notes:</h3>
        <ul>
          <li>[Enter meeting note]</li>
        </ul>

        <h3>Action Items:</h3>
        <ul>
          <li>[Enter action item with owner and due date]</li>
        </ul>
      `,
      tags: ["meeting", "notes"]
    },
    todo: {
      title: "To-Do List",
      content: `
        <p>Tasks:</p>
        <ul>
          <li><input type="checkbox"> Task 1</li>
          <li><input type="checkbox"> Task 2</li>
          <li><input type="checkbox"> Task 3</li>
        </ul>

        <h3>Notes:</h3>
        <ul>
          <li>[Enter any additional notes]</li>
        </ul>
      `,
      tags: ["to-do", "list"]
    },
    brainstorming: {
      title: "Brainstorming Notes",
      content: `
        <p>Topic: [Enter topic]</p>

        <h3>Ideas:</h3>
        <ul>
          <li>[Enter idea 1]</li>
          <li>[Enter idea 2]</li>
          <li>[Enter idea 3]</li>
        </ul>

        <h3>Next Steps:</h3>
        <ul>
          <li>[Enter next step or action]</li>
        </ul>
      `,
      tags: ["brainstorming", "ideas"]
    }
  };
