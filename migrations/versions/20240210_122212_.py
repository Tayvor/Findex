"""empty message

Revision ID: 08e1b7c0f35d
Revises: 4b40bfe6533f
Create Date: 2024-02-10 12:22:12.458255

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '08e1b7c0f35d'
down_revision = '4b40bfe6533f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.alter_column('thread_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    if environment == "production":
        op.execute(f"ALTER TABLE images SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.alter_column('thread_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
