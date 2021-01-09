export class QuizMapperSerivce {

    constructor() {}

    public static fromFormToOutputFormat<T = Object>(form: Object): T {
        const basic = {...form['basic']};
        delete form['basic'];
        form = {...form, ...basic};
        form['questions'].map(question => {
            if (question['correctRadio'] != null) {
                question['answers'][question['correctRadio']]['correct'] = true;
            }
            question['answers'].filter(f => f['correct'] == null).map(answer => {
                answer['correct'] = false;
                return answer;
            });
            delete question['correctRadio'];
            return question;
        });
        return form as T;
    }

    public static fromOutputToFormFormat(output: Object): Object {
        return {};
    }
}