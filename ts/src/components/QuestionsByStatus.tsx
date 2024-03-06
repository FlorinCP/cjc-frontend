import { useGetQuestionsByStatusQuery } from '../services/api';

const QuestionsComponent = () => {
    const status = 'ACCEPTED'; // Example status
    const bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6InBlYW5hZmxvcmluY29zbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwOTEwNTA1MiwiZXhwIjoxNzA5NzA5ODUyfQ.ag5Cl3nlscWxgj7ip2CtLuiWeQtlAKkndNZ1-93b7fs" ; // This should come from your authentication logic

    const { data: questions, error, isLoading } = useGetQuestionsByStatusQuery({ status, bearerToken });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred</div>;

    return (
        <div>
            {questions?.map(question => (
                <div key={question.id}>
                    <h3>{question.questionText}</h3>
                    <p>Status: {question.status}</p>
                </div>
            ))}
        </div>
    );
};

export default QuestionsComponent;
