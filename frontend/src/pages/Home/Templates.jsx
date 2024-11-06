export const templates = {
    meeting: {
      title: "Meeting Notes",
      content: `
        Date: [Enter date]
        Attendees: [Enter attendees]

        Agenda:
        1. [Enter agenda item]
        2. [Enter agenda item]

        Notes:
        - [Enter meeting note]

        Action Items:
        - [Enter action item with owner and due date]
      `,
      tags: ["meeting", "notes"]
    },
    todo: {
      title: "To-Do List",
      content: `
        To-Do List
        Tasks:
        - [ ] Task 1
        - [ ] Task 2
        - [ ] Task 3

        Notes:
        - [Enter any additional notes]
      `,
      tags: ["to-do", "list"]
    },
    brainstorming: {
      title: "Brainstorming Notes",
      content: `
        Brainstorming Notes
        Topic: [Enter topic]

        Ideas:
        - [Enter idea 1]
        - [Enter idea 2]
        - [Enter idea 3]

        Next Steps:
        - [Enter next step or action]
      `,
      tags: ["brainstorming", "ideas"]
    }
  };
