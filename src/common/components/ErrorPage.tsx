import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    // Route Error
    const error: any = useRouteError();

    // For Testing
    console.error(error);

    // Generic Error Message
    let genericErrorMessage = "Unexpected Error Has Occured";

    return (
        <div id="error-page">
            <h3>{genericErrorMessage}</h3>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}