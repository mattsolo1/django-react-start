from django.http import HttpResponse
import json


def hello_page_data(request):
    json_response = {
        'url': 'https://earth.nullschool.net/' +
               '#current/wind/surface/level/overlay=cape/orthographic=278.37,28.60,346',
    }

    json_response_string = json.dumps(json_response, sort_keys=True, indent=4)
    return HttpResponse(json_response_string, content_type="application/json")



"""
    # use raw SQL to compute family and individual counts using nested queries
    cursor = connection.cursor()
    cursor.execute("
SELECT
*,
(SELECT count(*) FROM base_family WHERE project_id=base_project.id) AS num_families,
(SELECT count(*) FROM base_individual WHERE project_id=base_project.id) AS num_individuals
FROM base_project
")

columns = [col[0] for col in cursor.description]
json_obj = [dict(zip(columns, row)) for row in cursor.fetchall()]
cursor.close()

json_response_string = json.dumps(
    {"projects": json_obj}, sort_keys=True, indent=4, default=DateTimeAwareJSONEncoder().default)

return HttpResponse(json_response_string, content_type="application/json")
"""