import SearchWrapper from "@/components/Jobs/SearchWrapper";
import Talents from "@/components/talents";


export default function Page() {
    return (
        <>
            <section className="container">
                <SearchWrapper
                    title="Talent Search"
                    description="Search or Filter to find the best talents"
                />
            </section>
            <section className="container mt-20">
                <Talents />
            </section>
        </>
    );
}