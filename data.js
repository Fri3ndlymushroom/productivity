
export let dummyData = {
    timer: {
        running: false,
        start: 0,
        project: "",
        duration: 0
    },
    projects: [
        {
            name: "MMonitor",
            pid: "P_399966c6-ba0d-48ae-be0f-700e4157fbb0",
            logs: [],
            color: "#EC2964",
        },
        {
            name: "HyperTyper",
            pid: "P_82d0c204-bfae-4f11-aafc-5bcd8a1a670a",
            logs: [],
            color:"#3DD6BA",
        }
    ],
    all_logs: [
        {
            project: "MMonitor",
            pid: "P_399966c6-ba0d-48ae-be0f-700e4157fbb0",
            lid: "L_663c4868-b5fe-4199-8ba8-a10f1909f999",
            day: 18913,
            start: 1634159644,
            end: 1634159744,
            duration: 100,
            color: "#EC2964"
        },
        {
            project: "MMonitor",
            pid: "P_399966c6-ba0d-48ae-be0f-700e4157fbb0",
            lid: "L_b14e8ef9-a34d-49d5-b370-35f3f8348bab",
            day: 18913,
            start: 1634159844,
            end: 1634159944,
            duration: 100,
            color: "#6441C8"
        },
        {
            project: "HyperTyper",
            pid: "P_82d0c204-bfae-4f11-aafc-5bcd8a1a670a",
            lid: "L_d4becc8b-2b9a-4b56-b014-e80805fc2a9e",
            day: 18913,
            start: 1634159144,
            end: 1634159244,
            duration: 100,
            color:"#3DD6BA",
        },
    ],
    daily_logs: []
}

export let defaultSettings = {
    start_of_day: 7200, //2h
    daily_goal: 3600
}