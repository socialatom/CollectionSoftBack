import StaffModel from "../models/StaffModel";

test('test-badkeys', () => {
    try {
        const staffModel = new StaffModel({
            badkey: "badvalue"
        });
    } catch(e) {
        expect(e.name == "ValidationError")
        expect(e.isJoi == true)
    }
});

test('test-incompletekeys', () => {
    try {
        const staffModel = new StaffModel({
          staffFirstName: "Sample"
        });
    } catch (e) {
        expect(e.name == "ValidationError")
        expect(e.isJoi == true)
    }
});

test('test-validkeys', () => {
    const staffModel = new StaffModel({
      staffProfileId: "id100",
      staffFirstName: "Sample Staff",
      staffLastName: "Sample Staff",
      staffEmail: "email@email.com",
      staffCampus: "Cali"
    });
    expect(staffModel);
})