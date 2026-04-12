export default function DashboardCard({ title, value }) {
    return (
        <div >
            <h4 >
                {title}
            </h4>

            <h2 >
                {value}
            </h2>
        </div>
    );
}