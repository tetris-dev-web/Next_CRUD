import { Link } from 'components';

export default Home;

function Home() {
    return (
        <div>
            <h1>WeGetFinancing</h1>
            <p>Software Engineer – Full Stack Technical Test - By Jubin Ri</p>
            <p><Link href="/accounts">&gt;&gt; Manage Accounts</Link></p>
        </div>
    );
}
