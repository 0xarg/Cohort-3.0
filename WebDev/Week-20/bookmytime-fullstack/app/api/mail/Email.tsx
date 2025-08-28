
interface MailProps{
    url: string,
    email?: string
}

export const Email = ({email, url}: MailProps) => {

    return (
      <div>
        Hi {email}, Thanks for signing up for BookMyTime, Please verify your
        email!.
        <div>

        <a href={url}>
          Verify Now
        </a>
        </div>
      </div>
    );

}