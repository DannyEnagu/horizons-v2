import JobForm from "@/components/forms/JobForm";

export default function Page() {
    return (
        <>
            <header className="container text-center">
                <h1 className="font-extrabold text-2xl">Post A Job</h1>
                <h2 className="text-sm text-muted">
                    Fill out the form below to post a job
                </h2>
            </header>
            <section className="container mt-20">
                <JobForm />
            </section>
        </>
    );
    }