const eventsStore = [
    {
        title: "INFJ Personality Type- Coffee Shop Meet & Greet",
        description: "Being an INFJ",
        date: new Date(2024, 3, 23, 15),//"2024-03-23T15:00:00Z",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w",
        type: "offline",
        attendees: 99,
        category: "Hobbies and Passions",
        distance: 50
    },
    {
        title: "Day Trading Idea and Strategy",
        description: "Learn strategies for day trading",
        date: new Date(2024, 3, 13, 18, 30),//"2024-03-13T18:30:00PDT",
        image: "img/en1.png",
        type: "offline",
        attendees: 29,
        category: "Business",
        distance: 5
    },
    {
        title: "Let's Talk Networking: JPMorgan Chase in Palo Alto",
        description: "Networking event in Palo Alto",
        date: new Date(2024, 3, 19, 17),//"2024-03-19T17:00:00PDT",
        image: "img/en2.png",
        type: "offline",
        attendees: 41,
        category: "Business",
        distance: 25
    },
    {
        title: "Tech Talks & Quiz: Next-Gen Database Solutions",
        description: "A tech discussion and quiz event",
        date: new Date(2024, 3, 13, 18),//"2024-03-13T18:00:00PDT",
        image: "img/en3.png",
        type: "online",
        attendees: 40,
        category: "Technology",
        distance: 0
    },
    {
        title: "INFORMS San Francisco Chapter In-Person Event",
        description: "Health and Wellbeing meetup",
        date: new Date(2024, 3, 28, 17),// "2024-03-28T17:00:00PDT",
        image: "img/en4.png",
        type: "offline",
        attendees: 41,
        category: "Health and Wellbeing",
        distance: 50
    },
    {
        title: "AI Wednesdays - Meet and Greet!",
        description: "Meet other AI enthusiasts",
        date: new Date(2024, 3, 13, 18, 30),//"2024-03-13T18:30:00PDT",
        image: "img/en5.png",
        type: "offline",
        attendees: 29,
        category: "Technology",
        distance: 5
    },
    {
        title: "ROS By-The-Bay March 2024",
        description: "Social gathering event",
        date: new Date(2024, 3, 21, 18),//"2024-03-21T18:00:00PDT",
        image: "img/en6.png",
        type: "online",
        attendees: 51,
        category: "Social Activities",
        distance: 0
    },
    {
        title: "Free Christian Singles' Dinner",
        description: "A social gathering for Christian singles",
        date: new Date(2024, 3, 29, 18),//"2024-03-29T18:00:00PDT",
        image: "img/en7.png",
        type: "offline",
        attendees: 11,
        category: "Hobbies and Passions",
        distance: 10
    },
    {
        title: "In-person: Deep Dive into RAG Architectures (Food served)",
        description: "Technical deep dive event",
        date: new Date(2024, 3, 14, 17),//"2024-03-14T17:00:00PDT",
        image: "img/en8.png",
        type: "offline",
        attendees: 16,
        category: "Hobbies and Passions",
        distance: 50
    },
    {
        title: "INFJ Personality Type- Coffee Shop Meet & Greet",
        description: "Being an INFJ",
        date: new Date(2024, 2, 23, 15),
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto= format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx 8fA%3D%3D%201037w ",
        type: "offline",
        attendees: 99,
        category: "Hobbies and Passions",
        distance: 50,
    },
    {
        title: "NYC AI Users- AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
        description: "New York AI Users",
        date: new Date(2024, 2, 23, 11, 30),
        image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=f ormat&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8 fA%3D%3D ",
        type: "offline",
        attendees: 43,
        category: "Technology",
        distance: 25,
    },
    {
        title: "Book 40+ Appointments Per Month Using AI and Automation",
        description: "New Jersey Business Network",
        date: new Date(2024, 2, 16, 14),
        image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto= format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx 8fA%3D%3D",
        type: "online",
        category: "Technology",
        distance: 10,
    },
    {
        title: "Dump writing group weekly meetup",
        description: "Dump writing group",
        date: new Date(2024, 2, 13, 11),
        image: "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870& auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufD B8fHx8fA%3D%3D",
        type: "online",
        attendees: 77,
        category: "Business",
        distance: 100,
    },
    {
        title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
        description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870& auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufD B8fHx8fA%3D%3D",
        type: "online",
        attendees: 140,
        category: "Social Activities",
        distance: 75,
    },
    {
        title: "All Nations- Manhattan Missions Church Bible Study",
        description: "Manhattan Bible Study Meetup Group",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870& auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufD B8fHx8fA%3D%3D",
        type: "offline",
        category: "Health and Wellbeing",
        distance: 15,
    },
];
export default eventsStore;