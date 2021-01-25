export class QuizMapperSerivce {

    constructor() {}

    public static fromFormToOutputFormat<T = Object>(input: Object): T {
        let form = JSON.parse(JSON.stringify(input));
        const basic = {...form['basic']};
        delete form['basic'];
        form = {...form, ...basic};
        form['questions'].map(question => {
            if (question['type'] == 'RADIO') {
                question['answers'].map(answer => {
                    answer['correct'] = false;
                    return answer;
                });
                question['answers'][question['correctRadio']]['correct'] = true;
            }
            else {
                question['answers'].filter(f => f['correct'] == null).map(answer => {
                    answer['correct'] = false;
                    return answer;
                });
            }
            delete question['correctRadio'];
            return question;
        });
        return form as T;
    }

    public static fromOutputToFormFormat<T = Object>(output: Object): T {
        let form = JSON.parse(JSON.stringify(output));
        form['basic'] = {
            title: form['title'],
            category: {
                id: form['category'].id
            },
            description: form['description'],
            time: form['time'],
            isInfinity: form['isInfinity'],
            approachesCount: form['approachesCount'],
            startDate: form['startDate'] && new Date(form['startDate']),
            endingDate: form['endingDate'] && new Date(form['endingDate'])
        };
        delete form['title'];
        delete form['category'];
        delete form['description'];
        delete form['time'];
        delete form['isInfinity'];
        delete form['approachesCount'];
        delete form['startDate'];
        delete form['endingDate'];
        form['questions'] = form['questions'].map(question => {
            if (question['type'] === 'RADIO') {
                form['questions'][form['questions'].indexOf(question)]['correctRadio'] = question['answers'].indexOf(question['answers'].filter(f => f.correct === true)[0]);
            }
            question['answers'] = question['answers'].map(answer => {
                delete answer['id'];
                delete answer['lp'];
                return answer;
            })
            return question;
        });
        console.log(form);
        return form as T;
    }
}