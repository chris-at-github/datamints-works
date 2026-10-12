export default function TimesheetLayout({ children }: LayoutProps<"/timesheet">) {
  return (
    <main className="page__main">
      <h1>Timesheet</h1>
      {children}
    </main>
  );
}
