export default function JobDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-[var(--surface-light)] p-10">
      <div className="mx-auto max-w-[900px] rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-semibold">Job Details</h1>
        <p className="mt-2 text-[var(--neutral-80)]">Job ID: {params.id}</p>
      </div>
    </main>
  );
}
