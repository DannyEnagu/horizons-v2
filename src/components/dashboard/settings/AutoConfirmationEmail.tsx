import { Switch } from "@/components/ui/switch";
import Card from "../Card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function AutoConfirmationEmail() {
    const exampleEmail = `Hi {first_name},\n\nThank you for applying to the {job_offer} position at {company_name}. We have received your application and will be reviewing it shortly. If you are selected for an interview, you will be contacted by a member of our team.\n\nBest,\n{company_name} Team`;
    const jobSubject = `{job_offer}`;
    return (<>
        <Card className="background-light800_dark_gradient rounded-lg">
            <Card.Header className="!block">
                <h2 className="font-semibold">
                    Auto Confirmation Email
                </h2>
                <p className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted">
                        If enabled, an email will be sent to the candidate when they apply for a job.
                    </span>
                    <Switch
                    //   checked={}
                    //   onCheckedChange={field.onChange}
                    //  className="ml-2"
                    />
                </p>
            </Card.Header>
            <Card.Content>
                <h2 className="text-xs text-muted">
                    Subject
                </h2>
                <p className="text-sm font-semibold mb-4">
                    <Badge variant="outline">
                        {jobSubject}
                    </Badge> {' '}
                    - Confirmation of Application
                </p>
                <Textarea
                    id="summary"
                    rows={15}
                    placeholder="Start typing here..."
                    value={exampleEmail}
                    className="text-sm"
                />
            </Card.Content>
            <Card.Footer>
                <div className="flex items-center gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="flex items-center gap-1 cursor-pointer text-sm">
                                    <span>Placeholder</span>
                                    <Info size={16} />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className="text-sm">
                                    <p>
                                        Placeholder variables can be used to personalize the email.
                                    </p>
                                    <h4 className="text-sm font-semibold my-2">
                                        Available Placeholders
                                    </h4>
                                    <p className="flex flex-col gap-2">
                                        <span>
                                            <strong>
                                                {`{first_name}`}
                                            </strong>
                                            - Candidate&apos;s First Name
                                        </span>
                                        <span>
                                            <strong>
                                                {`{job_offer}`}
                                            </strong>
                                            - Job Offer Title
                                        </span>
                                        <span>
                                            <strong>
                                                {`{company_name}`}
                                            </strong>
                                            - Company Name
                                        </span>
                                    </p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <p className="flex items-center flex-wrap gap-2">
                        <Badge variant="outline">
                            {`{first_name}`}
                        </Badge> {' '}
                        
                        <Badge variant="outline">
                            {`{job_offer}`}
                        </Badge> {' '}
                        
                        <Badge variant="outline">
                            {`{company_name}`}
                        </Badge> {' '}
                    </p>
                </div>
            </Card.Footer>
        </Card>
    </>)
}