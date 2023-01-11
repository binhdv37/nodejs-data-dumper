var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "query_optimize_test"
});

var permissionIdList = ['CLUSTER_CREATE', 'CONFIGMAP_CREATE', 'CONFIGMAP_DELETE', 'CONFIGMAP_UPDATE', 'CONFIGMAP_VIEW', 'INVITATION_CREATE', 'INVITATION_DELETE', 'INVITATION_READ', 'INVITATION_UPDATE', 'KAFKA_CONTROLLER', 'KAFKA_DELETE', 'KAFKA_VIEWER', 'PROJECT_ACCESS_MANAGEMENT', 'PROJECT_BILLING_CREATE', 'PROJECT_BILLING_DELETE', 'PROJECT_BILLING_READ', 'PROJECT_BILLING_UPDATE', 'PROJECT_DELETE', 'PROJECT_METRICS', 'PROJECT_READ', 'PROJECT_UPDATE', 'PROJECT_USER_ACCESS_ASSIGN', 'PROJECT_USER_ACCESS_VIEW', 'P_CONFIGMAP', 'P_ENVIRONMENT', 'P_ORGANIZATION_BILLING', 'P_ORGANIZATION_INVITE', 'P_ORGANIZATION_UPDATE', 'P_ORGANIZATION_VIEW', 'P_PROJECT_CREATE', 'P_SECRET', 'P_SERVICE_CONTROL', 'P_SERVICE_VIEW', 'P_VOLUME', 'S3_CONTROLLER', 'S3_DELETE', 'S3_VIEWER', 'SECRET_CREATE', 'SECRET_DELETE', 'SECRET_UPDATE',
    'SECRET_VIEWER', 'SERVICE_ACCOUNT_CREATE', 'SERVICE_ACCOUNT_DELETE', 'SERVICE_ACCOUNT_READ', 'SERVICE_ACCOUNT_UPDATE', 'SPINNER_CONTROLLER', 'SPINNER_DELETE', 'SPINNER_VIEWER', 'STORAGE_CREATE', 'STORAGE_DELETE', 'STORAGE_UPDATE', 'STORAGE_VIEWER', 'VM_CONTROLLER', 'VM_DELETE', 'VM_VIEWER'];

var resourceTypeList = ['sun_cluster', 'sun_project', 'sun_org'];

var resourcePath = ['.1.', '.2.', '.3.'];

con.connect(function (err) {
    if (err) throw err;

    const size = 100;

    var sql = "INSERT INTO query_optimize_test.user_resource ( permission_id, resource_id,resource_type, role_id, user_id, created_by, " +
        "created_date, updated_by, updated_date, tenant_id, resource_path, deleted_date) VALUES ?";

    const data = genSqlInputDataList(300000);

    con.query(sql, [data], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

});

function genSqlInputDataList(size) {
    let result = [];
    let tmp = 1800101;
    for (let i = 0; i < size; i++) {
        const permissionId =  randomPermissionId();
        const resourceId = tmp++;
        const resourceType = randomResourceType();
        const roleId = getRandomInt(1, 10);
        const userId = getRandomInt(1, 100);
        const createdBy = 1;
        const createdDate = '2022-05-13 07:31:33';
        const updatedBy = 1;
        const updatedDate = '2022-05-13 07:31:33';
        const tenantId = null;
        const resourcePath = randomResourcePath();
        const deletedDate = '2022-05-13 07:31:33';

        const x = [permissionId, resourceId, resourceType, roleId, userId, createdBy, createdDate, updatedBy, updatedDate, tenantId, resourcePath, deletedDate];

        result.push(x);
    }
    return result;
}

function randomPermissionId() {
    const index = getRandomInt(0, 54);
    return permissionIdList[index];
}

function randomResourceType() {
    const index = getRandomInt(0, 2);
    return resourceTypeList[index];
}

function randomResourcePath() {
    const index = getRandomInt(0, 2);
    return resourcePath[index];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

