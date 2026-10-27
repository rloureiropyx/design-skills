# Naming

Name everything as a person reading the report would say it. The CLI refuses generic names; `verify` flags duplicates.

| What | Pattern | Good | Bad |
| --- | --- | --- | --- |
| Flow (`--goal`) | What the user is trying to get done | Get a Payroll Journal report | Reporting test, Flow 1 |
| Main path (`--main-branch`) | The most common way to do it, verb + object | Open a previous Payroll Journal run | Main, Happy path |
| Branch (`explore branch --name`) | The alternative, verb + object, distinct from its siblings | Create a new Payroll Journal · Filter report history by date | Branch 2, Create report button |
| Screen (`--name`, `--start-name`) | `<Screen> · <state>` | Payroll Journal · Report history · Create Payroll Journal · Report options | Before interaction, Payroll Journal, RP N2A Client 1 (09623332) |
| Error or empty screen | `<Screen> · <condition>` | Report library · Load error (intermittent) | Error |

Rules:

- Use the product's own words for the screen part (page heading or breadcrumb), and the observed condition for the state part: open, empty, expanded, filtered, error, requested.
- Two screens never share a name. If structure differs, the state part must say how (e.g. "Manage menu open" vs "Date filter open").
- Branch names describe the user's intent, not the control. "Create a new Payroll Journal", not "Click Create report".
- Never put URLs, IDs, client numbers or people's names in a name.
- Edges are named by the CLI from the clicked control (`Click "Create report"`); do not rename them unless the control label is an internal string (e.g. `paychex.app.notifications.icon...`), in which case use `label --edge ID --action "Open notifications"`.
- Files follow screen names automatically: `assets/03-payroll-journal-report-history.png`, `video/w1440/02-create-a-new-payroll-journal.mp4`.
