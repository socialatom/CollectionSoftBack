import StudentModel from '../models/StudentModel'

test('test-badkeys', () => {
    try {
        const studentModel = new StudentModel({
            badkey: "badvalue"
        })
    } catch(e) {
        expect(e.name == "ValidationError")
        expect(e.isJoi == true)
    }
});

test('test-incompletekeys', () => {
    try {
        const studentModel = new StudentModel({
          studentFirstName: "Sample"
        });
    } catch (e) {
        expect(e.name == "ValidationError")
        expect(e.isJoi == true)
    }
});